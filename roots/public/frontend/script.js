// Login Function
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "admin" && password === "1234") {
    alert("Login successful!");
    window.location.href = "scanner.html";
  } else {
    alert("Invalid credentials! Try admin / 1234");
  }
}

// Detect Plant Function
async function detectPlant() {
  const fileInput = document.getElementById("fileInput");
  const result = document.getElementById("result");
  const locationText = document.getElementById("location");

  if (fileInput.files.length === 0) {
    alert("Please upload an image first!");
    return;
  }

  result.innerText = "Analyzing image...";

  const reader = new FileReader();
  reader.onload = async () => {
    const imageBase64 = reader.result;

    try {
      const response = await fetch("/api/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageBase64 })
      });

      const data = await response.json();
      result.innerText = data.result;
    } catch (err) {
      result.innerText = "❌ Error connecting to detection API!";
    }

    // Get User Location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        locationText.innerText = `📍 Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
      });
    } else {
      locationText.innerText = "Location access not supported!";
    }
  };

  reader.readAsDataURL(fileInput.files[0]);
}
