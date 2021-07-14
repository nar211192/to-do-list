import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addList } from "./reducers/rootReducer";
import { Lists } from "./components/lists";
import db from "./firebase.config";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

function App() {
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const chnageHandlerInput = (event) => {
    setText(event.target.value);
  };

  const addNewList = async (event) => {
    event.preventDefault();

    const newList = {
      title: text,
      checked: false,
    };

    try {
      const { id } = await db.collection("lists").add(newList);
      newList.id = id;

      dispatch(addList(newList));

      setText("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Container fixed>
        <form noValidate autoComplete="off" onSubmit={addNewList}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Title"
            value={text}
            onChange={chnageHandlerInput}
          />
        </form>

        <div>
          <Lists />
        </div>
      </Container>
    </div>
  );
}

export default App;
