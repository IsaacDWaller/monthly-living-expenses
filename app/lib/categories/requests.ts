"use server";

export async function getEmojisData() {
    const response = await fetch("https://cdn.jsdelivr.net/npm/@emoji-mart/data");
    const emojis = await response.json();
    return emojis;
}