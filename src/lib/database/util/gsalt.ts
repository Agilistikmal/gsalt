import { UserModel } from "../schema/User";

// Get 10 top users with most balance
export async function getTopGsalt(limit: number = 10) {
  const users = await UserModel.find().sort({ balance: -1 }).limit(limit);
  return users;
}

// Transfer gsalt balance from user1 to user2
export async function transferGsalt(
  from_user_id: string,
  to_user_id: string,
  amount: number
) {
  const fromUser = await UserModel.findOne({ user_id: from_user_id });
  const toUser = await UserModel.findOne({ user_id: to_user_id });

  if ((fromUser?.balance as number) < amount) {
    return {
      error: true,
      message: "Insufficient balance",
    };
  }

  await toUser?.update({
    $set: {
      balance: toUser.balance + amount,
    },
  });
  await fromUser?.update({
    $set: {
      balance: fromUser.balance - amount,
    },
  });

  return {
    error: false,
    message: "Success",
  };
}
