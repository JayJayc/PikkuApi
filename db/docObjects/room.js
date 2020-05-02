function Room(owner, roomId) {
    this.owner = owner;
    this.roomId = roomId;
    this.roomIdShort = roomId.slice(-5);
    this.roomStatus = "OPEN";
    this.roomURL = "localhost:3000/room/" + this.roomIdShort;
    this.numberOfPlayers = 1;
    this.openDate = Date.now();
    this.closeDate = null;
}

const newRoomToObject = (room) => {
    let object = {
        owner: room.owner,
        roomId: room.roomId,
        roomIdShort: room.roomIdShort,
        roomStatus: room.roomStatus,
        roomURL: room.roomURL,
        numberOfPlayers: room.numberOfPlayers,
        openDate: room,
    };
    return object;
};

export { Room, roomToObject };
