'use strict'

/**
 * Resourceful controller for interacting with profiles
 */
class ProfileController {
  /**
   * Show a list of all profiles.
   * GET profiles
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new profile.
   * GET profiles/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new profile.
   * POST profiles
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single profile.
   * GET profiles/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing profile.
   * GET profiles/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update profile details.
   * PUT or PATCH profiles/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a profile with id.
   * DELETE profiles/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ProfileController
