export const uploadImage = async (
  image: FormData,
): Promise<string | { error: string }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_UPLOAD_URL}?key=${process.env.NEXT_PUBLIC_UPLOAD_KEY}`,
      {
        method: 'POST',
        body: image,
        headers: {
          Accept: 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorMessage = `Error: ${response.statusText}`;
      console.error('Error uploading image:', errorMessage);
      return { error: errorMessage };
    }

    const data = await response.json();

    return data?.data?.url;
  } catch (error) {
    const message = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    return { error: message };
  }
};
