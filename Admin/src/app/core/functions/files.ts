export async function readFile(file: File): Promise<string | ArrayBuffer> {
  return new Promise<string | ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const target = e.target as FileReader;
      const result = target.result;
      if (result !== null) {
        return resolve(result);
      }
      return reject(null);
    };
    reader.onerror = () => {
      console.error(`FileReader failed on file ${file.name}.`);
      return reject(null);
    };
    if (!file) {
      console.error('No file to read.');
      return reject(null);
    }
    reader.readAsDataURL(file);
  });
}
