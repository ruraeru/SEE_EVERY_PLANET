"use client";

export const CalenderInput = () => {
    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value)
    }
    return (
        <input type="date" onChange={onChange} className="bg-black py-2 border-2 w-full" />
    )
}