import { supabase } from "../utils/database/supabase";

export const validateCredentials = async (body: any) => {
  if (
    body.wallet_address === undefined ||
    String(body.wallet_address).length != 42
  )
    return null;

  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("wallet_address", body.wallet_address);

  if (error || data == null || data.length != 1) return null;

  return data.at(0);
};
