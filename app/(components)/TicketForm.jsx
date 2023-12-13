'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"
const TicketForm = ({ ticket }) => {
    const router = useRouter();
    const EDITMODE = ticket._id === "new" ? false : true;

    const startingTicketData = {
        title: "",
        description: "",
        priority: 1,
        progress: 0,
        status: "Not started",
        category: "Hardware Problem"
    };

    if (EDITMODE) {
        startingTicketData["title"] = ticket.title;
        startingTicketData["description"] = ticket.description;
        startingTicketData["priority"] = ticket.priority;
        startingTicketData["progress"] = ticket.progress;
        startingTicketData["status"] = ticket.status;
        startingTicketData["category"] = ticket.category;
    }
    const [formData, setFormData] = useState(startingTicketData);
    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const hundleSubmit = async (e) => {
        e.preventDefault();
        if (EDITMODE) {
            const res = await fetch(`/api/Tickets/${ticket._id}`, {
                method: "PUT",
                body: JSON.stringify({ formData }),
                "content-type": "application/json"
            })

            if (!res.ok) {
                throw new Error("Failed to update ticket .");
            }

        } else {
            const res = await fetch('/api/Tickets', {
                method: "POST",
                body: JSON.stringify({ formData }),
                "content-type": "application/json"
            })

            if (!res.ok) {
                throw new Error("Failed to create Ticket correct the correction of error .");
            }
        }
       
        router.push('/')
        router.refresh()
    }

    return (
        <div className="flex justify-center">
            <form action="" className="flex flex-col gap-3 w-1/2" method="post" onSubmit={hundleSubmit}>
                <h3>{EDITMODE ? "Update Your Ticket" : "Create Your Ticket !!"}</h3>
                <label htmlFor="">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    onChange={handleChange}
                    required={true}
                    value={formData.title}
                />


                <label htmlFor="">Description</label>
                <textarea
                    id="description" name="description"
                    onChange={handleChange}
                    required={true}
                    value={formData.description}
                    rows={5}
                />

                <label htmlFor="">Category</label>
                <select
                    id="category" name="category"
                    onChange={handleChange}

                    value={formData.category}

                >
                    <option value="Hardware Problem">
                        Hardware Problem
                    </option>
                    <option value="Software Problem">
                        Software Problem
                    </option>
                    <option value="project">
                        Project
                    </option>
                </select>

                <label htmlFor="">Priority</label>
                <div>
                    <input
                        type="radio"
                        name="priority"
                        onChange={handleChange}
                        value={1}
                        checked={formData.priority == 1}
                    />

                    <label htmlFor="">1</label>
                    <input
                        type="radio"
                        name="priority"
                        onChange={handleChange}
                        value={2}
                        checked={formData.priority == 2}
                    />
                    <label htmlFor="">2</label>
                    <input
                        type="radio"
                        name="priority"
                        onChange={handleChange}
                        value={3}
                        checked={formData.priority == 3}
                    />
                    <label htmlFor="">3</label>
                    <input
                        type="radio"
                        name="priority"
                        onChange={handleChange}
                        value={4}
                        checked={formData.priority == 4}
                    />
                    <label htmlFor="">4</label>
                    <input
                        type="radio"
                        name="priority"
                        onChange={handleChange}
                        value={5}
                        checked={formData.priority == 5}
                    />
                </div>

                <label htmlFor="">Progress</label>
                <input
                    type="range"
                    id="progress"
                    name="progress"
                    value={formData.progress}
                    min="0"
                    max="100"
                    onChange={handleChange} />

                <label htmlFor="">Status</label>
                <select name="status" onChange={handleChange} value={formData.status}>
                    <option value="not start">Not start</option>
                    <option value="started">started</option>
                    <option value="done">Done</option>
                </select>


                <input type="submit" className="btn" value={EDITMODE ? "Update Ticket" : "create ticket"} />
            </form>
        </div>
    )
}

export default TicketForm