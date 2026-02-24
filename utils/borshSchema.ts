import * as borsh from 'borsh';

export const initializeTaskSchema = {
  struct: {
    instruction: 'u8', // 0 for InitializeTask
    taskId: 'u64',
    title: 'string',
    description: 'string',
    amount: 'u64',
  }
};

export const taskAccountSchema = {
  struct: {
    is_initialized: 'bool',
    task_id: 'u64',
    client: { array: { type: 'u8', len: 32 } },
    worker: { array: { type: 'u8', len: 32 } },
    title: 'string',
    description: 'string',
    amount: 'u64',
    created_at: 'i64',
    status: 'u8',
    is_paid: 'bool',
  }
};

// 🔥 The fully modernized v1.0 schema for AcceptTask
export const acceptTaskSchema = {
  struct: {
    instruction: 'u8',
    stake_amount: 'u64',
  }
};