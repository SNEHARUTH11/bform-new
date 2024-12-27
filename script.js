document.getElementById("uploadForm").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
  
    if (!file) {
      alert("Please upload a file.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "student_bform.xlsx";
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        const message = await response.text();
        alert(`Error: ${message}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while processing the file.");
    }
  });
  