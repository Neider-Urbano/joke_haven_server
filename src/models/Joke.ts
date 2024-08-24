import { Schema, model, Document } from 'mongoose';

interface IJoke extends Document {
  userId: Schema.Types.ObjectId;
  joke: string;
}

const JokeSchema = new Schema<IJoke>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  joke: { type: String, required: true }
});

export default model<IJoke>('Joke', JokeSchema);
