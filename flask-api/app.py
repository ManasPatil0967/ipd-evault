from flask import Flask, request, send_file
from flask_cors import CORS
from flask_restful import Resource, Api
from NTRU.NTRUdecrypt import NTRUdecrypt

from PIL import Image
import math
import os
from moviepy.editor import ImageSequenceClip
import imageio
import numpy as np
import io
from tqdm import tqdm

app = Flask(__name__)
CORS(app, expose_headers=['Content-Disposition'])
api = Api(app)


class FileToVideo(Resource):
    def post(self):
        file = request.files['file']
        file.save(file.filename)

        video_filename = fileToVideo(file.filename)

        os.remove(file.filename)

        return send_file('video/'+video_filename, as_attachment=True, download_name=video_filename)


class VideoToFile(Resource):
    def post(self):
        file = request.files['file']
        extension = request.form['extension']
        file.save(file.filename)

        filename = videoToFile(file.filename, extension)
        os.remove(file.filename)

        return send_file('output/'+filename+'.'+extension, as_attachment=True, download_name=filename+'.'+extension)


def fileToVideo(file_name, width=1920, height=1080, pixel_size=4, fps=24):
    # Convert file to binary data
    file_size = os.path.getsize(file_name)
    bin_string = ""
    with open(file_name, "rb") as f:
        for chunk in tqdm(iterable=iter(lambda: f.read(1024), b""), total=math.ceil(file_size/1024), unit="KB"):
            bin_string += "".join(f"{byte:08b}" for byte in chunk)

    num_pixels = len(bin_string)

    pixels_per_image = (width // pixel_size) * (height // pixel_size)

    num_images = math.ceil(num_pixels / pixels_per_image)
    # Convert binary data to frames
    frames = []

    for i in tqdm(range(num_images)):
        start_index = i * pixels_per_image
        end_index = min(start_index + pixels_per_image, num_pixels)
        binary_digits = bin_string[start_index:end_index]

        img = Image.new('RGB', (width, height), color='white')

        for row_index in range(height // pixel_size):

            start_index = row_index * (width // pixel_size)
            end_index = start_index + (width // pixel_size)
            row = binary_digits[start_index:end_index]

            for col_index, digit in enumerate(row):

                if digit == '1':
                    color = (0, 0, 0)  # Black
                else:
                    color = (255, 255, 255)  # White

                x1 = col_index * pixel_size
                y1 = row_index * pixel_size
                x2 = x1 + pixel_size
                y2 = y1 + pixel_size

                img.paste(color, (x1, y1, x2, y2))
    # Convert frames to video
        with io.BytesIO() as f:
            img.save(f, format='PNG')
            frame = np.array(Image.open(f))
        frames.append(frame)

    clip = ImageSequenceClip(frames, fps=fps)

    # Save video
    video_filename = file_name.split('.')[0] + '.mp4'
    clip.write_videofile('video/'+video_filename, fps=fps)

    return video_filename


def videoToFile(file, extension):
    # Extract frames from video
    frames = []
    dir_path = os.getcwd()
    vid = imageio.get_reader(file, 'ffmpeg')

    fps = vid.get_meta_data()['fps']

    num_frames = vid.get_length()

    with tqdm(total=num_frames) as pbar:
        for i, frame in enumerate(vid):
            frames.append(frame)
            pbar.update(1)

    # Convert frames to binary data
    threshold = 128

    binary_digits = ''

    for frame in tqdm(frames, desc="Processing frames"):
        gray_frame = np.mean(frame, axis=2).astype(np.uint8)

        pixel_size = 4

        for y in range(0, gray_frame.shape[0], pixel_size):
            for x in range(0, gray_frame.shape[1], pixel_size):
                color = gray_frame[y:y+pixel_size, x:x+pixel_size]

                if color.mean() < threshold:
                    binary_digits += '1'
                else:
                    binary_digits += '0'

    # Convert binary data to file
    binary_data = bytes(int(binary_digits[i:i+8], 2)
                        for i in range(0, len(binary_digits), 8))

    file_name = file.split('.')[0]
    filename = "output/"+file_name+'.'+extension
    with open(filename, "wb") as f:
        with tqdm(total=len(binary_data), unit='B', unit_scale=True, desc="Writing binary data") as pbar:
            for chunk in range(0, len(binary_data), 1024):
                f.write(binary_data[chunk:chunk+1024])
                pbar.update(1024)

        print(f"Binary data converted to {filename})")

    return file_name


def generate_keypair(user):
    N1 = NTRUdecrypt()
    # Set the parameters based on input flags (or lack thereof)
    N1.setNpq(N=167,p=3,q=128,df=61,dg=20,d=18)
    # Actually generate and save the public and private keys
    N1.genPubPriv(user)


api.add_resource(FileToVideo, '/filetovideo')
api.add_resource(VideoToFile, '/videotofile')

if __name__ == '__main__':
    app.run(debug=True)
