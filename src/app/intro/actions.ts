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
  year: z.coerce
    .number({ invalid_type_error: "숫자로 입력해주세요" })
    .min(1900)
    .max(2025),
  month: z.coerce
    .number({ invalid_type_error: "숫자로 입력해주세요" })
    .min(1)
    .max(12),
  day: z.coerce
    .number({ invalid_type_error: "숫자로 입력해주세요" })
    .min(1)
    .max(31),
});

export async function validateUser(_: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    year: formData.get("year"),
    month: formData.get("month"),
    day: formData.get("day"),
  };
  console.log(data);
  const result = formSchema.safeParse(data);
  console.log(result);
  if (!result.success) {
    return {
      error: result.error.flatten(),
      isSuccess: false,
    };
  } else {
    localStorage.setItem("username", result.data.username);
    localStorage.setItem("year", result.data.year.toString());
    localStorage.setItem("month", result.data.month.toString());
    localStorage.setItem("day", result.data.day.toString());
    redirect("/main");
  }
}
