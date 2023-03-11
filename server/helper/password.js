import bcrypt from "bcrypt";

export const hashPassword = plaintext => bcrypt.hashSync(plaintext, 8);

export const isValidPassword = (plaintext, ciphertext) => bcrypt.compareSync(plaintext, ciphertext);