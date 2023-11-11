function UserLanguages({ username, token }) {
  const [languages, setLanguages] = useState(null);

  useEffect(() => {
    fetchLanguagesInPinnedRepos(username, setLanguages, token);
  }, [username, token]);

  if (languages === null) return <PulseLoader />;

  return (
    <div>
      <h3 className="font-bold">Languages in Pinned Repositories:</h3>
      <ul>
        {Object.entries(languages).length === 0 ? (
          <li>No languages found.</li>
        ) : (
          Object.entries(languages).map(([language, bytes]) => (
            <li key={language}>
              {language}: {bytes.toLocaleString()} bytes
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
