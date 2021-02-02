from StyleTransferModel import apply_style_transfer, decode_image
import webview
from PIL import Image


class Api:
    """
        The JavaScript -> Python interface. Adding a function here will allow you to
        access it in JavaScript via window.pywebview.api
    """

    def apply_style(self, images:dict) -> str:
        """
        Takes in two images and blends them together with neural style transfer model. Returns the resulting image.
        """

        metadata = "data:image/png;base64,"
        result = metadata + apply_style_transfer(images["source"], images["style"])
        return result

    def save_image(self, image_data:str):
        """
        Opens up file dialog and saves image to disk
        """
        filename = webview.windows[0].create_file_dialog(webview.SAVE_DIALOG, directory='/', save_filename='styled-image.png')
        image = Image.fromarray(decode_image(image_data))
        image.save(filename, "PNG")

