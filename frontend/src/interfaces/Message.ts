export interface IMessage {
  from: string;       // ID del usuario que envía el mensaje (representado como string)
  to: string;         // ID del usuario que recibe el mensaje (representado como string)
  message: string;    // Contenido del mensaje
  createdAt?: Date;   // Fecha de creación (opcional, generada automáticamente)
  updatedAt?: Date;   // Fecha de actualización (opcional, generada automáticamente)
}
