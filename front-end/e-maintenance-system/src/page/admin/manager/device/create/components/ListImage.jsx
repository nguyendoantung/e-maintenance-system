import { ImageList, ImageListItem } from "@material-ui/core";
import React from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

export default function ListImage({ data, removeImage }) {
    const realData = [...data];
    return (
        <ImageList sx={{ width: 50, height: 50 }} rowHeight={50}>
            {realData.map((image, index) => {
                return (
                    <>
                        <ImageListItem key={index}>
                            <img
                                alt={image.name}
                                src={URL.createObjectURL(image)}
                                style={{
                                    maxWidth: "100px",
                                    maxHeight: "100px",
                                }}
                            />
                            ;
                        </ImageListItem>
                        <HighlightOffIcon
                            onClick={() => {
                                removeImage(index);
                            }}
                        />
                    </>
                );
            })}
        </ImageList>
    );
}
