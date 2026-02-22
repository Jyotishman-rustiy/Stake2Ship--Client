// utils/borshSchema.ts

export const initializeTaskSchema = {
  struct: {
    instruction: 'u8', // 0 for InitializeTask
    taskId: 'u64',
    title: 'string',
    description: 'string',
    amount: 'u64',
  }
};