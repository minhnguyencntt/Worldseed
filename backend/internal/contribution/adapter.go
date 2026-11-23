package contribution

import (
	"context"
)

// NewValidationStore adapts a Repository to the Store that Service validates against.
// Lookups are scoped to the world and compare prompts by their normalized hash.
func NewValidationStore(repo Repository) Store {
	return &validationStore{repo: repo}
}

type validationStore struct {
	repo Repository
}

func (s *validationStore) Save(ctx context.Context, c Contribution) error {
	_, err := s.repo.Save(ctx, c)
	return err
}

func (s *validationStore) CountByPlayer(worldID, roundID, playerID string) (int, error) {
	list, err := s.inWorld(worldID, roundID, playerID)
	if err != nil {
		return 0, err
	}
	return len(list), nil
}

func (s *validationStore) HasPrompt(worldID, roundID, playerID, hash string) (bool, error) {
	list, err := s.inWorld(worldID, roundID, playerID)
	if err != nil {
		return false, err
	}
	for _, c := range list {
		if promptHash(c.Prompt) == hash {
			return true, nil
		}
	}
	return false, nil
}

func (s *validationStore) inWorld(worldID, roundID, playerID string) ([]Contribution, error) {
	list, err := s.repo.ListByPlayer(context.Background(), roundID, playerID)
	if err != nil {
		return nil, err
	}
	var out []Contribution
	for _, c := range list {
		if c.WorldID == worldID {
			out = append(out, c)
		}
	}
	return out, nil
}
