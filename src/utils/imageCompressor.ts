export async function compressImageFile(
  file: File,
  name?: string
): Promise<{ base64: string; mimeType: string; name?: string }> {
  return new Promise((resolve, reject) => {
    // If not an image (e.g. PDF), read as raw base64 data URL
    if (!file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const match = result.match(/^data:([^;]+);base64,(.+)$/);
        if (match) {
          resolve({
            base64: match[2],
            mimeType: match[1],
            name: name || file.name,
          });
        } else {
          resolve({
            base64: result,
            mimeType: file.type || 'application/octet-stream',
            name: name || file.name,
          });
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
      return;
    }

    // For images, load into an Image and scale down if huge to speed up Gemini payload
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 1920;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          const raw = (reader.result as string).replace(/^data:[^;]+;base64,/, '');
          resolve({ base64: raw, mimeType: file.type, name: name || file.name });
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        const cleanBase64 = dataUrl.replace(/^data:image\/jpeg;base64,/, '');
        resolve({
          base64: cleanBase64,
          mimeType: 'image/jpeg',
          name: name || file.name,
        });
      };
      img.onerror = () => {
        const raw = (reader.result as string).replace(/^data:[^;]+;base64,/, '');
        resolve({ base64: raw, mimeType: file.type, name: name || file.name });
      };
      img.src = reader.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
