import { Navigate } from 'react-router-dom';

/** Disposables and products share the same catalog until backend is connected. */
export default function DisposablesPage() {
  return <Navigate to="/products" replace />;
}
