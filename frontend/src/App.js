import { Toaster } from 'react-hot-toast';
// ... other imports

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Add more routes here later */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}