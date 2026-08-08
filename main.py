import qrcode

# Define the data or URL
data = ""

# Generate and save the image
img = qrcode.make(data)
img.save("simple_qr.png")
