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
            <form action={dispatch} className="flex flex-col items-center">
                <div>
                    <Input
                        name="username"
                        placeholder="이름을 입력해주세요"
                        errors={state?.error?.fieldErrors.username}
                    />
                </div>
                <div className="flex gap-5 mt-10">
                    <Input
                        name="birth_day"
                        placeholder="YYYY-MM-DD"
                        errors={state?.error?.fieldErrors.birthDay}
                        onChange={onChange}
                        value={birthday}
                        minLength={8}
                        maxLength={10}
                    />
                    <button>submit</button>
                </div>
            </form>
        </div>
    )
}

export default NamePage;