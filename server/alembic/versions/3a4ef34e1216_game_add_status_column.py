"""game: add status column

Revision ID: 3a4ef34e1216
Revises: 
Create Date: 2015-10-05 13:57:05.986858

"""

# revision identifiers, used by Alembic.
revision = '3a4ef34e1216'
down_revision = None
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column('game', sa.Column('status', sa.String(100)))


def downgrade():
    op.drop_column('game', 'status')
