function saveUserToFile(username, password) {
  const fileContent = `${username}:${password}\n`;

  window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

  window.requestFileSystem(
    window.TEMPORARY,
    fileContent.length,
    (fs) => {
      fs.root.getFile(
        "users.txt",
        { create: true },
        (fileEntry) => {
          fileEntry.createWriter(
            (fileWriter) => {
              fileWriter.onwriteend = () => {
                console.log("Zapisano użytkownika do pliku.");
              };

              fileWriter.onerror = (e) => {
                console.log("Wystąpił błąd podczas zapisywania użytkownika do pliku:", e);
              };

              const blob = new Blob([fileContent], { type: "text/plain" });
              fileWriter.write(blob);
            },
            (e) => {
              console.log("Wystąpił błąd podczas uzyskiwania dostępu do pliku:", e);
            }
          );
        },
        (e) => {
          console.log("Wystąpił błąd podczas tworzenia pliku:", e);
        }
      );
    },
    (e) => {
      console.log("Wystąpił błąd podczas uzyskiwania dostępu do systemu plików:", e);
    }
  );
}
