import qrcode

# Define the data or URL
data = "http://localhost:3000/dashboard.html"

# Generate and save the image
img = qrcode.make(data)
img.save("simple_qr1.png")
