'use client'

import { FormEvent, useState } from "react";

import { z } from "zod";

const Modal = ({ contactName, closeFunction }: { contactName: string, closeFunction: any }) => {
    const [formValidating, setFormValidating] = useState<boolean>(false);
    const [errors, setErrors] = useState<any[]>([]);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        console.log("SEND the validated message form to the server");
        event.preventDefault();
        setFormValidating(true)

        try {
            console.log(name, email, subject, message);
            // prepare validation rules for each field
            const contactSchema = z.object({
                name: z.string().min(3, { message: "Name must be at least 3 character long" }),
                email: z.coerce.string().email().min(5, { message: "Email must be a valid email address" }),
                subject: z.string().min(5, { message: "Subject must be at least 5 characters long" }),
                message: z.string().min(10, { message: "Message must be at least 10 characters long" }),
            });

            // store validation response
            const response = contactSchema.safeParse({
                name: name,
                email: email,
                subject: subject,
                message: message
            });

            // refine errors
            if (!response.success) {
                let errArr: any[] = [];
                const { errors: err } = response.error;
                for (var i = 0; i < err.length; i++) {
                    errArr.push({ for: err[i].path[0], message: err[i].message });
                }
                setErrors(errArr);
                throw err;
            }

            setErrors([]);
        } catch (error) {
            console.error(error);
        } finally {
            setFormValidating(false);
        }
    }
    const handleResetForm = () => {
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
    }
    return (
        <div className="min-h-screen flex flex-col justify-center items-center absolute inset-0">
            {/* Blurry Background Layer */}
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

            {/* Modal Content */}
            <div className="relative py-3 sm:max-w-xl sm:mx-auto z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#43270a] to-[#f49038] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="text-black relative px-4 py-10 bg-[#feb372] shadow-lg sm:rounded-3xl sm:p-10">
                    {/* Exit Button */}
                    <button
                        className="absolute top-4 right-4 text-black font-bold bg-[#feb372] rounded-full p-2 focus:outline-none"
                        onClick={closeFunction}
                    >
                        ✕
                    </button>
                    {/* Modal Content */}
                    <div className="text-center pb-6">
                        <h1 className="text-3xl">Get in touch with {contactName}</h1>
                        <p className="text-gray-700">
                            Fill up the form below to send {contactName} a message.
                        </p>
                    </div>
                    {/* Modal Form */}
                    <form onSubmit={handleSubmit} onReset={handleResetForm}>
                        <div className="my-4">
                            <input
                                className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <div className="-mt-4 text-xs text-red-500">
                                {errors.find((error) => error.for === "name")?.message}
                            </div>
                        </div>
                        <div className="my-4">
                            <input
                                className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="-mt-4 text-xs text-red-500">
                                {errors.find((error) => error.for === "email")?.message}
                            </div>
                        </div>
                        <div className="my-4">
                            <input
                                className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Subject"
                                name="_subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                            <div className="-mt-4 text-xs text-red-500">
                                {errors.find((error) => error.for === "subject")?.message}
                            </div>
                        </div>
                        <div className="my-4">
                            <textarea
                                className="shadow mb-4 min-h-0 appearance-none border rounded h-64 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Type your message here..."
                                name="message"
                                style={{ height: '121px' }}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            >
                            </textarea>
                            <div className="-mt-5 text-xs text-red-500">
                                {errors.find((error) => error.for === "message")?.message}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <input
                                className="shadow bg-black hover:bg-[#4b2c0c] text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                                type="reset" value="Clear"
                            />
                            <input
                                className="shadow bg-black hover:bg-[#4b2c0c] text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                                type="submit"
                                value="Send ➤"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Modal;