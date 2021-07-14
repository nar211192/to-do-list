import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { removeList, updateList } from "../reducers/rootReducer";
import "../index.css";
import db from "../firebase.config";
import { Button, Checkbox } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

export const List = ({ list }) => {
  const dispatch = useDispatch();
  const [isDeleting, setisDeleting] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [editText, seteditText] = useState(list.title);

  const style = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const chnageHandlerInput = (event) => {
    seteditText((prev) => event.target.value);
  };

  const removeItem = async () => {
    setisDeleting(true);
    await db.collection("lists").doc(list.id).delete();
    dispatch(removeList(list.id));
  };

  const update = async (checked) => {
    if (list.title !== editText) {
      await db.collection("lists").doc(list.id).update({
        title: editText,
      });
      dispatch(updateList({ list, title: editText }));
      setisEdit(false);
    } else if (checked) {
      checked = !list.checked;
      await db.collection("lists").doc(list.id).update({
        checked,
      });
    }
  };

  return (
    <div style={style}>
      <Checkbox
        defaultChecked={list.checked}
        onChange={() => {
          update(true);
        }}
        disabled={isEdit}
        color="primary"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />

      {isEdit ? (
        <TextField
          id="standard-basic"
          label="List Title"
          value={editText}
          onChange={chnageHandlerInput}
        />
      ) : (
        <p className={list.checked ? "checked_line" : "nochecked_line"}>
          {list.title}
        </p>
      )}

      <div>
        <Button
          style={{ marginRight: "5px" }}
          variant="contained"
          color="secondary"
          onClick={() => {
            if (isEdit) {
              update();
            } else {
              setisEdit(true);
            }
          }}
        >
          {isEdit ? "Update" : "Edit"}
        </Button>

        {!isEdit ? (
          <Button
            variant="contained"
            color="secondary"
            disabled={isDeleting || isEdit}
            onClick={removeItem}
          >
            {isDeleting ? "Deleting" : "Delete"}
          </Button>
        ) : (
          <Fragment />
        )}
      </div>
    </div>
  );
};
