import { API_URL } from "@/constants";

export const createAddress = async (address) => {
  try {
    const currentTimestamp = new Date().toISOString();
    const addressWithTimestamps = {
      ...address,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    };
    console.log(addressWithTimestamps)

    const response = await fetch(`${API_URL}/addresses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addressWithTimestamps),
    });

    if (!response.ok) {
      throw new Error("Error creating address");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating address:", error);
    throw error;
  }
};
