export const BubbleClosed = ({}) => {
    return(
        <button
        {/*TODO: trigger modal opening here*/}
        >
            bub
        </button>
    )
}

export const BubbleOpen = ({}) => {
  //  This bit will go into the modal
  return <div className={`bubble`}>
      <div>geolocation</div>
      <div>creation timestamp</div>
      <div>country/city</div>
      <div>text content if any</div>
  </div>;
};

export const BubbleInput = ({}) => {
    // Should probably be on a separate page
    // TODO: Ask for permissions for location, audio recording, video recording APIs here
    return(
        <div>
        <form>
            {/*TODO: Put a WISYWIG here, perhaps TinyMCE?*/}
            <input type="textarea"/>
            <button>Record Audio</button>
            <button>Click picture</button>
            <button type="submit">Skip</button>
            <button type="submit">submit</button>
        </form>
        </div>
    )
}
