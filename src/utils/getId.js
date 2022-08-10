function getId() {
  let id = Date.now();

  return () => {
    id += 1;
    return id;
  };
}

const createId = getId();

export default createId;
