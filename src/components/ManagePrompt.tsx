type EventType = {
  event: string;
};

export default function ManagePrompt({ event }: EventType) {
  return (
    <>
      <div className="container">
        <div>
          <form>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" required />
            <label htmlFor="prompt">Prompt</label>
            <input type="text" name="prompt" id="prompt" required />
            <label htmlFor="tags">Tags</label>
            <input type="tags" name="tags" id="tags" required />
            <p>Effectiveness</p>
          </form>
          <button>{event}</button>
        </div>
      </div>
    </>
  );
}
