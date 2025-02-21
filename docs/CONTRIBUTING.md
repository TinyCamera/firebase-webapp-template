# Contributing Guide

This guide explains how to add features to this project following established patterns and best practices. We'll use the todos feature as a reference implementation.

## Client-Side Development

### Feature Structure

Features follow a modular structure under `packages/client/src/features/[feature-name]`:

```
features/todos/
├── api/              # API integration
│   └── todosApi.ts
├── components/       # React components
│   ├── TodoList.tsx
│   ├── TodoItem.tsx
│   └── TodoForm.tsx
├── store/           # Redux state management
│   ├── todosSlice.ts
│   ├── todosSaga.ts
│   └── todosSelectors.ts
└── types/           # TypeScript types
    └── index.ts
```

### Adding a New Feature

1. Create the feature folder structure:

```bash
mkdir -p src/features/[feature-name]/{api,components,store,types}
```

2. Define types in `types/index.ts`:

```typescript
// Example from todos/types/index.ts
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: null | string;
  filter: "all" | "active" | "completed";
}
```

3. Create Redux slice in `store/[feature]Slice.ts`:

```typescript
// Example pattern from todosSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "featureName",
  initialState,
  reducers: {
    // Follow pattern: actionStart, actionSuccess, actionFailure
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action: PayloadAction<Data[]>) => {
      state.data = action.payload;
      state.loading = false;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
```

4. Implement API integration in `api/[feature]Api.ts`:

```typescript
// Example pattern
import { apiClient } from "@/shared/apiClient";

export const featureApi = {
  getAll: () => apiClient.get("/endpoint"),
  getById: (id: string) => apiClient.get(`/endpoint/${id}`),
  create: (data: CreateDTO) => apiClient.post("/endpoint", data),
  update: (id: string, data: UpdateDTO) =>
    apiClient.put(`/endpoint/${id}`, data),
  delete: (id: string) => apiClient.delete(`/endpoint/${id}`),
};
```

5. Build UI components following these patterns:

```typescript
// List component pattern
export const FeatureList: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchItemsStart());
  }, [dispatch]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1">
        Feature Name
      </Typography>

      {/* Form component for creation */}
      <FeatureForm onSubmit={handleCreate} />

      {/* List of items */}
      <Stack spacing={2}>
        {items.map(item => (
          <FeatureItem
            key={item.id}
            item={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </Stack>

      {/* Loading state */}
      {loading && <CircularProgress />}
    </Container>
  );
};
```

## Server-Side Development

### Module Structure

Server modules follow a Controller-Service-Repository pattern:

```
modules/[feature]/
├── featureController.ts   # Request handling
├── featureService.ts      # Business logic
├── featureRepository.ts   # Data access
├── featureRoutes.ts      # Route definitions
└── featureModel.ts       # Types & interfaces
```

### Adding a New Module

1. Create model definitions:

```typescript
// Example from todoModel.ts
export interface CreateDTO {
  title: string;
}

export interface UpdateDTO {
  title?: string;
  completed?: boolean;
}

export interface Model {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

2. Implement repository pattern for Firestore:

```typescript
// Example pattern from todoRepository.ts
export class Repository {
  private collection: CollectionReference;

  constructor() {
    this.collection = db.collection("collectionName");
  }

  private toModel(id: string, data: DocumentData): Model {
    return {
      id,
      ...data,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    };
  }

  async findAll(): Promise<Model[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => this.toModel(doc.id, doc.data()));
  }

  async create(data: CreateDTO): Promise<Model> {
    const now = Timestamp.now();
    const docData = {
      ...data,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await this.collection.add(docData);
    const doc = await docRef.get();
    return this.toModel(doc.id, doc.data()!);
  }
}
```

3. Set up routes:

```typescript
// Example from todoRoutes.ts
const router = express.Router();
const repository = new Repository();
const service = new Service(repository);
const controller = new Controller(service);

router.get("/", controller.getAll);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
```

## Best Practices

### Frontend

- Use TypeScript interfaces for all data structures
- Implement proper loading and error states
- Use Material-UI components for consistent UI
- Follow Redux patterns: slice for state, sagas for side effects
- Keep components focused and composable
- Use proper data fetching patterns with error handling

### Backend

- Follow Controller-Service-Repository pattern
- Implement proper error handling using custom error classes
- Use TypeScript for type safety
- Include proper validation for requests
- Follow REST API conventions
- Use proper Firestore patterns for data storage

### Firestore Patterns

- Use appropriate collection names
- Include createdAt and updatedAt timestamps
- Implement proper data modeling
- Use batch operations when needed
- Follow security rules best practices

## Testing

- Add unit tests for critical business logic
- Include integration tests for API endpoints
- Test React components with proper user interactions
- Follow the existing test patterns in the project

## Shared Code

When building features, utilize and contribute to shared code in `packages/shared`:

- Add shared types to `shared/src/types`
- Add shared utilities to `shared/src/utils`
- Follow existing patterns for consistency

## Examples

For more detailed implementation examples, refer to:

- Frontend: `packages/client/src/features/todos/*`
- Backend: `packages/server/src/modules/todos/*`
- Shared: `packages/shared/src/types/*`
