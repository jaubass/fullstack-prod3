function socketHandler(socket) {
    // Al conectarse, hacer console.log y enviar mensaje a todos los clientes
    console.log('New client connected:', socket.id);
    socket.broadcast.emit("dimelotodo", {
        status: "ok",
        text: "Nuevo usuario conectado: " + socket.id
    });

    // Queda a la espera de recibir mensajes para reenviarlos a todos los clientes
    socket.on('dimelotodo', (msg) => {
        socket.broadcast.emit('dimelotodo', msg);
    });

    // Al desconectarse, hacer console.log
    socket.on('disconnect', () => console.log('Client disconnected'));
}

export default socketHandler;