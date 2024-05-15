import { toast } from "react-toastify";

export const fetchData = async (message: string) => {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer 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",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gryphe/mythomist-7b:free",
          messages: [{ role: "user", content: message }],
          top_p: 1,
          temperature: 0.9,
          repetition_penalty: 1,
        }),
      }
    );

    const responseData = await response.json();
    return responseData.choices[0].message.content;
  } catch (error) {
    toast.error("Something Went Wrong", {
      position: "top-right",
      theme: "dark",
    });
    throw error; // Rethrow the error so it can be caught by the caller
  }
};
