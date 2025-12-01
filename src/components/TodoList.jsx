export default function TodoList({ fetchTodos }) {
  function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    fetch("http://localhost:6767/indhold/sigma", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: formData.get("title"),
        status: false,
      }),
    }).then(() => {
      e.target.reset();
      fetchTodos();
    });
  }

  return (
    <div className="wrapper">
      <form className="todo-form" onSubmit={submitHandler}>
        <p className="muted">sæt text ind for at være cool</p>
        <input
          className="todo-input"
          placeholder="Opgaver"
          required
          type="text"
          name="title"
          id="title"
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
