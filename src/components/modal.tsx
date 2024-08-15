'use client'

import { FormEvent, useState } from "react";

const Modal = ({ contactName, closeModal }: ModalProps) => {
    const [formValidating, setFormValidating] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormValidating(true);

        try {
            const response = await fetch('/api/validateContactForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                const errorMap: { [key: string]: string } = {};
                console.log("Result errors:", result.errors); // Add this line to inspect the errors
                result.errors.forEach((error: { field: string, message: string }) => {
                    errorMap[error.field] = error.message;
                });
                setErrors(errorMap);
                console.log("Errors:", errorMap);
            } else {
                handleResetForm();
                setTimeout(() => {
                    closeModal();
                    setTimeout(() => {
                        alert("Message sent successfully!");
                    }, 200);
                }, 100);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setFormValidating(false);
        }
    };

    const handleResetForm = () => {
        setFormData({
            name: "",
            email: "",
            subject: "",
            message: ""
        });
        setErrors({});
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center absolute inset-0">
            {/* Blurry Background Layer */}
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

            {/* Modal Content */}
            <div className="relative py-3 sm:max-w-xl sm:mx-auto z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#43270a] to-[#f49038] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="text-black relative px-4 py-10 bg-[#feb372] shadow-lg sm:rounded-3xl sm:p-10">
                    {/* Exit Button */}
                    <button
                        className="absolute top-4 right-4 text-black font-bold bg-[#feb372] rounded-full p-2 focus:outline-none"
                        onClick={closeModal}
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
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <div className="-mt-4 text-sm text-red-500">
                                {errors.name}
                            </div>
                        </div>
                        <div className="my-4">
                            <input
                                className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <div className="-mt-4 text-sm text-red-500">
                                {errors.email}
                            </div>
                        </div>
                        <div className="my-4">
                            <input
                                className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                            />
                            <div className="-mt-4 text-sm text-red-500">
                                {errors.subject}
                            </div>
                        </div>
                        <div className="my-4">
                            <textarea
                                className="shadow mb-4 min-h-0 h-[121px] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Type your message here..."
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                            />
                            <div className="-mt-5 text-sm text-red-500">
                                {errors.message}
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
                                value={formValidating ? `Sending...` : `Send ➤`}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Modal;