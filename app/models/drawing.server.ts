import type { User } from "./user.server";
import { supabase } from "./user.server";

export type Drawing = {
  id: string;
  title: string;
  matrix: string[][];
  width: number;
  profile_id: string;
};

const TABLE_NAME = "drawings";

export async function getDrawingListItems({ userId }: { userId: User["id"] }) {
  const { data } = await supabase
    .from(TABLE_NAME)
    .select("id, title, matrix, width")
    .eq("profile_id", userId);

  return data;
}

export async function createDrawing({
  title,
  matrix,
  width,
  userId,
}: Pick<Drawing, "matrix" | "title" | "width"> & {
  userId: User["id"];
}) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([{ title, matrix, width, profile_id: userId }])
    .single();

  if (!error) {
    return data;
  }

  return null;
}

export async function deleteDrawing({
  id,
  userId,
}: Pick<Drawing, "id"> & { userId: User["id"] }) {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete({ returning: "minimal" })
    .match({ id, profile_id: userId });

  if (!error) {
    return {};
  }

  return null;
}

export async function getDrawing({
  id,
  userId,
}: Pick<Drawing, "id"> & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("profile_id", userId)
    .eq("id", id)
    .single();

  if (!error) {
    return {
      userId: data.profile_id,
      id: data.id,
      title: data.title,
      body: data.body,
    };
  }

  return null;
}
