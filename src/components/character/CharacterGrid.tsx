import type { CharacterGridProps } from "../../types/characters";

export default function CharacterGrid({
    uniqueCharacters,
    handleEdit,
    handleDelete,
    user,
}: CharacterGridProps) {
  return (
    <div className="grid">
        {uniqueCharacters.map((character) => (
          <div key={character.id} className="character-card">
            <img src={character.image} alt={character.name} />
            <div className="card-content">
              <h3>{character.name}</h3>
              <p><strong>Raza:</strong> {character.race}</p>
              <p><strong>Género:</strong> {character.gender}</p>
              <p><strong>Ki:</strong> {character.ki}</p>
              <p><strong>Afiliación:</strong> {character.affiliation}</p>
              {user?.role === 'admin' && (
                <div className="card-actions">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleEdit(character)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(character)}
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
  )
}
