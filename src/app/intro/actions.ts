import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  username: z
    .string({
      required_error: "이름을 입력해주세요.!!",
      invalid_type_error: "문자열로 입력해주세요.",
    })
    .toLowerCase()
    .trim(),
  birthDay: z.string(),
});

export async function validateUser(_: unknown, formData: FormData) {
  const data = {
    username: formData.get("username"),
    birthDay: formData.get("birth_day"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return {
      error: result.error.flatten(),
      isSuccess: false,
    };
  } else {
    if (result.data.username.length < 1) {
      return {
        error: {
          fieldErrors: {
            username: ["이름을 입력해주세요!!!"],
            birthDay: [],
          },
        },
      };
    }
    localStorage.setItem("username", result.data.username);
    localStorage.setItem("birthDay", result.data.birthDay);
    redirect(`/detail/${result.data.birthDay}`);
  }
}
