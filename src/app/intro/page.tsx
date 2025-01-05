"use client";

import { useActionState, useEffect } from "react";
import { validateUser } from "./actions";
import Input from "@/components/intro/input";

const NamePage = () => {
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
                        name="year"
                        placeholder="YYYY"
                        errors={state?.error?.fieldErrors.year}
                    />
                    <Input
                        name="month"
                        placeholder="MM"
                        errors={state?.error?.fieldErrors.month}
                    />
                    <Input
                        name="day"
                        placeholder="DD"
                        errors={state?.error?.fieldErrors.day}
                    />
                    <button>submit</button>
                </div>
            </form>
        </div>
    )
}

export default NamePage;