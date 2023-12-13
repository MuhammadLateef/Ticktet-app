import mongoose, {Schema} from "mongoose";

// mongoose.connect(process.env.MONGO_URI, {
mongoose.connect('mongodb+srv://admin:mQRGXJLvSYk5QtWZ@cluster0.ko1h2em.mongodb.net/TicketDB', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
     console.log('DB Connection Error: ' + err);
});

mongoose.Promise = global.Promise

const ticketSchema = new Schema(
    {
        title: String,
        description: String,
        priority: Number,
        progress: Number,
        status: String,
        category: String,
        active: Boolean,
    },
    {
        timestamps: true,
    }
);
const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

export default Ticket;