"use client";

import { redirect } from "next/navigation";
import { useState } from "react";

export const CalenderInput = () => {
    const [date, setDate] = useState<string | null>(null);
    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value)
        setDate(e.currentTarget.value);
    }
    const onClick = () => {
        if (date) {
            redirect(`/detail/${date}`)
        }
    }
    return (
        <div>
            <input type="date" onChange={onChange} className="bg-black py-2 border-2" />
            <button onClick={onClick}>검색!</button>
        </div>
    )
}