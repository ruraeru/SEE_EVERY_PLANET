import { redirect } from "next/navigation";
import { z } from "zod";

const checkUsername = (username: string) => username.length > 1;
const checkBirthday = (birthDay: string) => birthDay.length > 1;

const formSchema = z.object({
  username: z
    .string({
      required_error: "이름을 입력해주세요.!!",
      invalid_type_error: "문자열로 입력해주세요.",
    })
    .toLowerCase()
    .trim()
    .refine(checkUsername, "이름을 입력해주세요!!"),
  birthDay: z.string().refine(checkBirthday, "생년월일을 입력해주세요!!!"),
});

export async function validateUser(_: unknown, formData: FormData) {
  const data = {
    username: formData.get("username"),
    birthDay: formData.get("birth_day"),
  };
  const result = formSchema.safeParse(data);
  console.log(result.data?.birthDay);
  if (!result.success) {
    return {
      error: result.error.flatten(),
      isSuccess: false,
    };
  } else {
    localStorage.setItem("username", result.data.username);
    localStorage.setItem("birthDay", result.data.birthDay);
    redirect(`/detail/${result.data.birthDay}`);
  }
}
