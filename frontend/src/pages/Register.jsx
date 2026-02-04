const [role, setRole] = useState('student');

// Inside your return form:
<select 
    value={role} 
    onChange={(e) => setRole(e.target.value)}
    className="w-full p-2 border rounded-md"
>
    <option value="student">Student</option>
    <option value="admin">Admin (Librarian)</option>
</select>