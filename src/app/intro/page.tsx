"use client";

import { FormEvent, useActionState, useEffect, useState } from "react";
import { validateUser } from "./actions";
import Input from "@/components/intro/input";

const NamePage = () => {
    const [birthday, setDay] = useState("");
    const onChange = (e: FormEvent<HTMLInputElement>) => {
        const dateValue = e.currentTarget.value;

        setDay(
            dateValue.replace(/[^0-9]/g, '')
                .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1-$2-$3")
                .replace(/(\-{1,2})$/g, "")
        )
    }
    const [state, dispatch] = useActionState(validateUser, null);
    useEffect(() => {
        localStorage.clear();
    }, []);
    return (
        <div>
            <div>
                <h1 className="text-5xl font-extrabold text-center p-5 bg-neutral-500">🌍 SEE MY PLANET</h1>
            </div>
            <form action={dispatch} className="flex flex-col items-center p-5">
                <div className="flex flex-col gap-2">
                    <label htmlFor="username">
                        이름
                    </label>
                    <Input
                        name="username"
                        placeholder="이름을 입력해주세요"
                        errors={state?.error?.fieldErrors.username}
                    />
                </div>
                <div className="flex gap-5 mt-10 flex-col">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="birth_day">
                            생일
                        </label>
                        <Input
                            name="birth_day"
                            placeholder="YYYY-MM-DD"
                            errors={state?.error?.fieldErrors.birthDay}
                            onChange={onChange}
                            value={birthday}
                            minLength={8}
                            maxLength={10}
                        />
                    </div>
                    <button className="bg-cyan-800 p-5 text-xl rounded-full">완료</button>
                </div>
            </form>
        </div>
    )
}

export default NamePage;