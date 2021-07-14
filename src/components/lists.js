import React, { useEffect, useState } from "react";
import { List } from "./list";
import { useSelector, useDispatch } from "react-redux";
import db from "../firebase.config";
import { showFetchedLists } from "../reducers/rootReducer";

export const Lists = () => {
  const { lists } = useSelector((state) => state.rootReducer);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLists = async () => {
      setIsLoading(true);
      const response = db.collection("lists");
      const data = await response.get();

      let fethcingData = data.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      dispatch(showFetchedLists(fethcingData));
      setIsLoading(false);
    };
    fetchLists();
  }, [dispatch]);

  if (isLoading) {
    return <h1>Loooooooooading</h1>;
  }

  if (!lists.length) {
    return <h2>Lists is empty!</h2>;
  }

  return lists.map((list) => <List key={list.id} list={list} />);
};
