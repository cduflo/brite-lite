import { createClient } from "@supabase/supabase-js";
import invariant from "tiny-invariant";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

invariant(
  supabaseUrl,
  "SUPABASE_URL must be set in your environment variables."
);
invariant(
  supabaseAnonKey,
  "SUPABASE_ANON_KEY must be set in your environment variables."
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: "10",
    },
  },
});

export type Room = {
  id: string;
  zoomId?: string;
  matrix: number[][];
  width: number;
};

const TABLE_NAME = "rooms";

const generateMatrix = (height = 20, width = 25) => {
  const matrix = [];
  for (let h = 0; h < height; h++) {
    const variableWidth = h % 2 === 0 ? width : width - 1;
    matrix[h] = new Array(variableWidth).fill(-1);
  }
  return matrix;
};

export async function createRoom({ zoomId }: Pick<Room, "zoomId">) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert({ zoomId, matrix: generateMatrix() })
    .select()
    .single();

  if (!error) {
    return data;
  }
  console.log({ error });

  return data;
}

export async function setBoardPeg({ id, matrix }: Pick<Room, "id" | "matrix">) {
  const { error } = await supabase
    .from(TABLE_NAME)
    .update({ matrix })
    .eq("id", id);

  if (!error) {
    return {};
  }

  return null;
}

export async function resetDrawing({ id }: Pick<Room, "id">) {
  const { error } = await supabase
    .from(TABLE_NAME)
    .update({ matrix: generateMatrix() })
    .eq("id", id);

  if (!error) {
    return {};
  }

  return null;
}

export async function getRoom({ id }: Pick<Room, "id">) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id)
    .single();

  if (!error) {
    return data;
  }

  return null;
}
